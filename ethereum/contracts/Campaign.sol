pragma solidity^0.4.17;

contract CampaignFactory {
    address[] public depployedCampaigns;

    function createCampaign(uint minimum,string name,string description,string image) public {
        address newCampaign  = new Campaign(minimum, msg.sender, name, description, image);
        depployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[]){
        return depployedCampaigns;
    }
}

contract Campaign {
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    string public CampaignName;
    string public CampaignDescription;
    string public imageUrl;
    // address[] public approvers;                  //--> arrays
    mapping(address => bool) public approvers;      //-->mapping
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator, string name,string description,string image) public {
        manager = creator; 
        minimumContribution = minimum;
        CampaignName=name;
        CampaignDescription=description;
        imageUrl=image;
    }
    // here payable is what makes this function able to receive some amount of money 
    // function contribute() public payable {
    //     require(msg.value > minimumContribution);

    //     // approvers.push(msg.sender);  --> used in arrays
    //     approvers[msg.sender] = true;       //--> jsut like javascript objects
    //     approversCount++;
    // }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        if (!approvers[msg.sender]) {

            approversCount++;
            approvers[msg.sender] = true;
        }
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient:recipient,
            complete: false,
            approvalCount: 0
        });

        // Request(description, value, recipient, false);

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);     // -->should have contributed
        require(!request.approvals[msg.sender]);       //--> approving for 1 time only 

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request =requests[index];
        require(!request.complete);
        require(request.approvalCount >(approversCount/2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address, string, string, string
        )
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager,
            CampaignName,
            CampaignDescription,
            imageUrl
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}