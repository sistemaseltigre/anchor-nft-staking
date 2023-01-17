import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorNftStaking } from "../target/types/anchor_nft_staking";
import {setupNft} from "./utils/setupNft";
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
/* const METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"); */
describe("anchor-nft-staking", () => {
  // Configure the client to use the local cluster.
  //anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const wallet = anchor.workspace.AnchorNftStaking.provider.wallet
  const program = anchor.workspace.AnchorNftStaking as Program<AnchorNftStaking>;

  let delegatedAuthPda: anchor.web3.PublicKey
  let stakeStatePda: anchor.web3.PublicKey
  let nft: any
  let mintAuth: anchor.web3.PublicKey
  let mint: anchor.web3.PublicKey
  let tokenAddress: anchor.web3.PublicKey

  before(async () => {
    ;({ nft, delegatedAuthPda, stakeStatePda, mint, mintAuth, tokenAddress } =
      await setupNft(program, wallet.payer))
  })

  it("Stakes", async () => {
    // Add your test here.
    const account = await program.account.userStakeInfo.fetch(stakeStatePda)
    expect(account.stakeState === "Staked")
    
      await program.methods
      .stake()
      .accounts({
        nftTokenAccount: nft.tokenAddress,
        nftMint: nft.mintAddress,
        nftEdition: nft.masterEditionAddress,
        metadataProgram: METADATA_PROGRAM_ID,
      })
      .rpc()
    
      console.log('la cuenta esta en staking');
    
   

  })
  /* it("Redeems", async () => {
    await program.methods
      .redeem()
      .accounts({
        nftTokenAccount: nft.tokenAddress,
        stakeMint: mint,
        userStakeAta: tokenAddress,
      })
      .rpc() }) */
  
});
