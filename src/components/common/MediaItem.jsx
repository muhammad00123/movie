import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import CircularRate from "./CircularRate";
import { useSelector } from "react-redux";
import favoriteUtils from "../../utils/favorite.utils";

const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(media.first_air_date && media.first_air_date.split("-")[0]);
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <Link to={mediaType !== "people" ? routesGen.mediaDetail(mediaType, media.mediaId || media.id) : routesGen.person(media.id)}>
      <Box
        sx={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "transform 0.3s ease",
          },
        }}
      >
        <Box
          sx={{
            ...uiConfigs.style.backgroundImage(posterPath),
            paddingTop: "160%",
            position: "relative",
            color: "primary.contrastText",
          }}
        >
          {/* movie or tv item */}
          {mediaType !== "people" && (
            <>
              {favoriteUtils.check({ listFavorites, mediaId: media.id }) && (
                <FavoriteIcon
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    fontSize: "2rem",
                    zIndex: 1,
                    margin: "30px",
                  }}
                />
              )}
              <Box
                sx={{
                  opacity: 0,
                  transition: "all 0.3s ease",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
                }}
              />
              <Button
                className="media-play-btn"
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  opacity: 0,
                  transition: "all 0.3s ease",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  "& .MuiButton-startIcon": { marginRight: "-4px" },
                }}
              />
              <Box
                className="media-info"
                sx={{
                  opacity: 0,
                  transition: "all 0.3s ease",
                  position: "absolute",
                  bottom: "-20px",
                  width: "100%",
                  height: "max-content",
                  boxSizing: "border-box",
                  padding: "1rem",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
              >
                <Stack spacing={1}>
                  {rate && <CircularRate value={rate} />}
                  <Typography>{releaseDate}</Typography>
                  <Typography
                    variant="body1"
                    fontWeight="700"
                    sx={{
                      fontSize: "1rem",
                      ...uiConfigs.style.typoLines(1, "left"),
                    }}
                  >
                    {title}
                  </Typography>
                </Stack>
              </Box>
            </>
          )}
          {/* movie or tv item */}

          {/* people */}
          {mediaType === "people" && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "max-content",
                bottom: 0,
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                {media.name}
              </Typography>
            </Box>
          )}
          {/* people */}
        </Box>
      </Box>
    </Link>
 

 );
};

export default MediaItem;