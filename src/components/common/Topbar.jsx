import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <AppBar elevation={0} sx={{ zIndex: 9999 }}>
        <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="inherit" sx={{ mr: 2, display: { md: "none" } }} onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Box className="logo" sx={{ display: { xs: "inline-block", md: "none" } }}>
              <Logo />
            </Box>
          </Stack>

          {/* main menu */}
          <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
            <Box className="logo" sx={{ marginRight: "30px" }}>
              <Logo />
            </Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{
                  color: appState.includes(item.state) ? "primary.contrastText" : "inherit",
                  mr: 2
                }}
                component={Link}
                to={item.path}
                variant={appState.includes(item.state) ? "contained" : "text"}
              >
                {item.display}
              </Button>
            ))}
            <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
              {themeMode === themeModes.dark ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
            </IconButton>
          </Box>
          {/* main menu */}

          {/* user menu */}
          <Stack spacing={3} direction="row" alignItems="center">
            {!user && (
              <Button variant="contained" onClick={() => dispatch(setAuthModalOpen(true))}>
                Sign In
              </Button>
            )}
          </Stack>
          {user && <UserMenu />}
          {/* user menu */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Topbar;

