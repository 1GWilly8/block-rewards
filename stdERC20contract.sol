pragma solidity ^0.4.11;

// import "./stdERC20interface.sol";

interface StdERC20Interface {
    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// @param _supply The total supply of all coins
    /// @return The total supply of coins
    function totalSupply() public constant returns (uint256 _supply);

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    // solhint-disable-next-line no-simple-event-func-name  
    event Transfer(address indexed _from, address indexed _to, uint256 _value); 
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract StdERC20Contract is StdERC20Interface {
	
	uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    string public _tokenName = "MyTestTokens";                   //Fancy name.
    uint8 public  _decimalUnits = 3;               //How many decimals to show.
    string public _tokenSymbol = "MYT";                 //A 3 letter identifier.
    uint public constant _totalSupply = 1000000;

	function StdERC20Contract() public {
        balances[msg.sender] = _totalSupply;                            // Set the symbol for display purposes
    }

	function totalSupply() public constant returns (uint) {
		return _totalSupply;
	}

 	function balanceOf(address _tokenOwner) public constant returns (uint balance) {
 		return balances[_tokenOwner];
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
		uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        Transfer(_from, _to, _value);
        return true;
	}

		function allowance(address _tokenOwner, address _spender) public constant returns (uint remaining) {
		return allowed[_tokenOwner][_spender];
	}

	
	event Transfer(address indexed from, address indexed to, uint tokens);

	event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

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
	
