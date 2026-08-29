import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      try {
        const videoPath = props.video.startsWith("/")
          ? props.video
          : `/images/${props.video}`;
        const response = await fetch(videoPath);
        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setVideo((prev) => {
            if (prev.startsWith("blob:")) URL.revokeObjectURL(prev);
            return blobUrl;
          });
        }
      } catch (e) {
        console.warn("WorkImage video fetch error:", e);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsVideo(false);
    if (video.startsWith("blob:")) {
      URL.revokeObjectURL(video);
      setVideo("");
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} />
        {isVideo && video && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
