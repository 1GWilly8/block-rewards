pragma solidity ^0.4.11;

contract StdERC20Contract is EIP20Interface {
	
	uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    string public name;                   //Fancy name.
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //A 3 letter identifier.

	function StdERC20Contract(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
    }

	function totalSupply() public constant returns (uint) {
		return totalSupply;
	}

 	function balanceOf(address _tokenOwner) public constant returns (uint balance) {
 		return balances[_tokenOwner];
 	}

	function allowance(address _tokenOwner, address _spender) public constant returns (uint remaining) {
		return allowed[_tokenOwner][_spender];
	}

	function transfer(address _to, uint _value) public returns (bool success) {
		require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;
	}

	function approve(address _spender, uint _value) public returns (bool success) {
		allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
	}

	function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
		require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;
	}

	
	event Transfer(address indexed from, address indexed to, uint tokens) {

	}

	event Approval(address indexed tokenOwner, address indexed spender, uint tokens) {

	}


	// mapping (bytes32 => uint8) public votesRecieved;

	// bytes32[] public candidateList;


	// function Voting (bytes32[] candidateNames) {
		
	// 	candidateList = candidateNames;
	// }


	// function totalVotesFor (bytes32 candidate) returns(uint8) {
		
	// 	return votesRecieved[candidate];
	// }
	

	// function voteForCandidate (bytes32 candidate) {
	// 	if (validCandidate(candidate) == false) throw;
	// 	votesRecieved[candidate] += 1; 
	// }

	// function validCandidate (bytes32 candidate) returns (bool) {

	// 	for (uint i = 0; i < candidateList.length; i++) {
	// 		if (candidateList[i] == candidate) {
	// 			return true;
	// 		}
	// 	}

	// 	return false;
 // 	}
	
}