function Navbar({onconnectWallet, walletAddress}) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">NFT Marketplace</div>
            <div className="navbar-menu">
                <button className="connect-wallet-button"
                onClick={onconnectWallet}>{walletAddress.slice(0, 8) ||  "Connect Wallet"}</button>
            </div>
        </nav>
    )
}

export default Navbar;