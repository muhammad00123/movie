import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import AutoSwiper from "./AutoSwiper";

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "160%",
              margin: "10px",
              boxShadow:
                "rgba(255, 255, 255, 0.5) 0px 0px 8px, rgba(0, 0, 0, 0.35) 0px 2px 15px",
              borderRadius: "10px",
              "&:hover": {
                borderRadius: "10px",
                "& .media-info": {
                  opacity: 1,
                  bottom: "0px",
                  borderRadius: "10px",
                },
                "& .media-back-drop, & .media-play-btn": { opacity: 3 },
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.posterPath(
                  item.file_path
                )})`,
              },
            }}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;
