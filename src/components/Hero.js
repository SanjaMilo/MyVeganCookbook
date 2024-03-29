import useHeaderHeight from "../hooks/useHeaderHeight";

const Hero = () => {
    const headerHeight = useHeaderHeight();

    return (
        <div className="hero-image" style={{ marginTop: headerHeight + 50}}>
            <div className="hero-text">
                <h1 className="hero-title">All Vegan Recipes</h1>
                <p className="hero-p">Lets start cooking some delicious food!</p>
            </div>
        </div>
    )
};

export default Hero;
