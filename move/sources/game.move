module capy_hero::game {
  use sui::transfer;
  use sui::object::{Self, UID};
  use sui::tx_context::{Self, TxContext};

  // TODO v2
  // - make the GameNFT soulbound
  // - make addresses able to be referenced in explorer
  // - add logo as nft images

  struct AdminCap has key { id: UID }

  // how to make it immutable and soulbound
  // **store** ability so that it can be saved under the leaderboard object
  struct CapyHeroGame has key, store {
    // game id
    id: UID,
    // player
    player_address: address,
    // hero
    // pass by reference
    capy_hero: address,
    // score
    score: u64,
  }
  
  // init function
  // give the admin capability to the smart contract publisher
  // only someone with the AdminCap will be able to create 
  fun init(ctx: &mut TxContext) {
    transfer::transfer(AdminCap { id: object::new(ctx) }, tx_context::sender(ctx));
  }

  // create new game
  // NFTs will be generated server-side and then transfered to the player
  public entry fun new_game(_: &AdminCap, player_address: address, capy_hero: address, score: u64, ctx: &mut TxContext ) {
    let game = CapyHeroGame {
      id: object::new(ctx),
      player_address,
      capy_hero,
      score,
    };

    // transfer the NFT to the game player
    transfer::transfer(game, player_address)
  }
}
