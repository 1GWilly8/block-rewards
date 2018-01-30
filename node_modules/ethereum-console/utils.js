function chainParams(options) {
  var params = {
    sealEngine: 'NoProof',
    options: {},
    params: {
      accountStartNonce: '0x',
      maximumExtraDataSize: '0x1000000',
      blockReward: '0x',
      allowFutureBlocks: '1'
    },
    genesis: {
      author: '0000000000000010000000000000000000000000',
      timestamp: '0x00',
      parentHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      extraData: '0x',
      gasLimit: '0x1000000000000'
    },
    accounts: {
      '0000000000000000000000000000000000000001': { 'wei': '1', 'precompiled': { 'name': 'ecrecover', 'linear': { 'base': 3000, 'word': 0 } } },
      '0000000000000000000000000000000000000002': { 'wei': '1', 'precompiled': { 'name': 'sha256', 'linear': { 'base': 60, 'word': 12 } } },
      '0000000000000000000000000000000000000003': { 'wei': '1', 'precompiled': { 'name': 'ripemd160', 'linear': { 'base': 600, 'word': 120 } } },
      '0000000000000000000000000000000000000004': { 'wei': '1', 'precompiled': { 'name': 'identity', 'linear': { 'base': 15, 'word': 3 } } },
      'c0c2c08481d2bde7d709c33534c526491871b25c': { 'wei': '1606938044258990275541962092341162602522202993782792835301376' }
    }
  };
  if (options.accounts !== undefined) {
    for (var address in options.accounts) {
      params.accounts[address] = { wei: options.accounts[address] };
    }
  }
  return params;
};

module.exports = {
    /// Generate chain params. Example: chainParams({accounts: {'0x123...456': '123456'}})
    /// Will fund account '0x123...456' with '123456' wei.
    chainParams: chainParams
};
