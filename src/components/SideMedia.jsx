const SideMedia = ({ video }) => {
    return (
        <div className="side-media d-none d-md-block">
            <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
            />
        </div>
    );
};

export default SideMedia;
