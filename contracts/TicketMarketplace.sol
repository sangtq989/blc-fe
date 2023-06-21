// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract TicketMarketplace {
    enum TicketStatus {
        Proposal,
        Doing,
        Cancel,
        ExpertDone,
        CustDone
    }

    struct Ticket {
        uint256 id;
        address customer;
        string worker;
        string title;
        string description;
        string tag;
        string date;
        int rate;
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
        string memory title,
        string memory tags,
        string memory date,
        string memory _description,
        string memory target
    ) public returns (uint256) {
        tickets.push(
            Ticket({
                id: tickets.length,
                customer: msg.sender,
                title: title,
                worker: target,
                date: date,
                description: _description,
                status: TicketStatus.Proposal,
                rate: -1,
                tag: tags
            })
        );
        return tickets.length - 1;
    }

    function cancelTicket(
        uint256 ticketIndex
    ) public {
        Ticket storage ticket = tickets[ticketIndex];
        require(
            ticket.status == TicketStatus.Proposal,
            "You can't cancel the ticket if started"
        );
        ticket.status = TicketStatus.Cancel;
        emit ContractUpdated(
            ApplicationName,
            WorkflowName,
            "TicketAccepted",
            msg.sender
        );
    }

    function startTicket(
        uint256 ticketIndex
    ) public {
        Ticket storage ticket = tickets[ticketIndex];
        // require(
        //     abi.encodePacked(msg.sender) == keccak256(bytes(ticket.worker)),
        //     "Sender can't start they own ticket"
        // );
        require(
            ticket.status == TicketStatus.Proposal,
            "Ticket must be in Proposal status"
        );
        ticket.status = TicketStatus.Doing;
        emit ContractUpdated(
            ApplicationName,
            WorkflowName,
            "TicketStarted",
            msg.sender
        );
    }

    function expertFinishTicket(uint256 ticketIndex) public {
        Ticket storage ticket = tickets[ticketIndex];
        // require(
        //     msg.sender == keccak256(ticket.worker),
        //     "Only the assigned worker can complete the ticket"
        // );
        require(
            ticket.status == TicketStatus.Doing,
            "Ticket must be in Doing status"
        );
        ticket.status = TicketStatus.ExpertDone;
        emit ContractUpdated(
            ApplicationName,
            WorkflowName,
            "TicketFinished",
            msg.sender
        );
    }


    function customerDoneTicket(uint256 ticketIndex, int256 rate) public {
        Ticket storage ticket = tickets[ticketIndex];
        require(
            msg.sender == ticket.customer,
            "Ticket must be finish by customer"
        );
        require(
            ticket.status == TicketStatus.ExpertDone,
            "Ticket must be in done by the expert"
        );
        ticket.status = TicketStatus.CustDone;
        ticket.rate = rate;
        emit ContractUpdated(
            ApplicationName,
            WorkflowName,
            "TicketFinished",
            msg.sender
        );
    }

    function getTicketsByAddress(
        string calldata addressString
    ) public view returns (Ticket[] memory) {

    
        uint256 count = 0;
        for (uint256 i = 0; i < tickets.length; i++) {
            if (keccak256(bytes(tickets[i].worker)) == keccak256(bytes(addressString))) {
                count++;
            }
        }

        Ticket[] memory filteredItems = new Ticket[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < tickets.length; i++) {
            if (keccak256(bytes(tickets[i].worker)) == keccak256(bytes(addressString))) {
                filteredItems[index] = tickets[i];
                index++;
            }
        }

        return filteredItems;
    }


    function getYourRequestTicket() public view returns (Ticket[] memory) {

        uint256 count = 0;
        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i].customer == msg.sender) {
                count++;
            }
        }

        Ticket[] memory filteredItems = new Ticket[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i].customer == msg.sender) {
                filteredItems[index] = tickets[i];
                index++;
            }
        }

        return filteredItems;
    }
}
