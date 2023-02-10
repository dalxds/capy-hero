module capy_hero::game {
  use sui::transfer;
  use sui::object::{Self, UID};
  use sui::tx_context::{Self, TxContext};
  use std::string::{Self, String};
  use sui::url::{Self, Url};

  // TODO v2
  // - make the GameNFT soulbound
  // - make addresses able to be referenced in explorer

  struct AdminCap has key { id: UID }

  // how to make it immutable and soulbound
  // **store** ability so that it can be saved under the leaderboard object
  struct CapyHeroGame has key, store {
    // game id
    id: UID,
    // game name
    name: String,
    // game description
    description: String,
    // game logo url
    url: Url,
    // player
    player_address: address,
    // hero
    capy_hero: address,
    // score
    score: u64,
  }

  const CAPY_HERO_LOGO_URL:vector<u8> = b"https://user-images.githubusercontent.com/47785842/217014370-3ecbd8d0-c07f-4c72-8b0f-f59941559aaf.png";
  
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
      name: string::utf8(b"Capy Hero"),
      description: string::utf8(b"A simple clicking game to explore the Sui Blockchain."),
      url: url::new_unsafe_from_bytes(CAPY_HERO_LOGO_URL),
      player_address,
      capy_hero,
      score,
    };

    // transfer the NFT to the game player
    transfer::transfer(game, player_address)
  }
}
