// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract TicketMarketplace {
    enum TicketStatus {
        Proposal,
        Accept,
        Doing,
        Done
    }

    struct Ticket {
        address customer;
        address worker;
        string description;
        TicketStatus status;
    }

    string internal ApplicationName = "TicketMarketplace";
    string internal WorkflowName = "TicketMarketplace";

    event ContractCreated(
        string applicationName,
        string workflowName,
        address originatingAddress
    );
    event ContractUpdated(
        string applicationName,
        string workflowName,
        string action,
        address originatingAddress
    );

    Ticket[] public tickets;

    function createTicket(
        string memory _description
    ) public returns (uint256) {
        tickets.push(
            Ticket({
                customer: msg.sender,
                worker: address(0),
                description: _description,
                status: TicketStatus.Proposal
            })
        );
        return tickets.length - 1;
    }

    function assignWorker(uint256 ticketIndex) public {
        Ticket storage ticket = tickets[ticketIndex];
        require(
            msg.sender == ticket.customer,
            "Only the customer can assign a worker"
        );
        require(
            ticket.status == TicketStatus.Proposal,
            "Ticket must be in Proposal status"
        );
        ticket.worker = msg.sender;
        ticket.status = TicketStatus.Accept;
        emit ContractUpdated(
            ApplicationName,
            WorkflowName,
            "TicketAccepted",
            msg.sender
        );
    }

    function startTicket(uint256 ticketIndex) public {
        Ticket storage ticket = tickets[ticketIndex];
        require(
            msg.sender == ticket.worker,
            "Only the assigned worker can start the ticket"
        );
        require(
            ticket.status == TicketStatus.Accept,
            "Ticket must be in Accept status"
        );
        ticket.status = TicketStatus.Doing;
        emit ContractUpdated(
            ApplicationName,
            WorkflowName,
            "TicketStarted",
            msg.sender
        );
    }

    function finishTicket(uint256 ticketIndex) public {
        Ticket storage ticket = tickets[ticketIndex];
        require(
            msg.sender == ticket.worker,
            "Only the assigned worker can finish the ticket"
        );
        require(
            ticket.status == TicketStatus.Doing,
            "Ticket must be in Doing status"
        );
        ticket.status = TicketStatus.Done;
        emit ContractUpdated(
            ApplicationName,
            WorkflowName,
            "TicketFinished",
            msg.sender
        );
    }

    function getTickets() public view returns (Ticket[] memory) {
        return tickets;
    }
}
