import { useState } from 'react';
import { Card } from '../../common/ui/Card/Card';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Box, Tab, Tabs } from '@mui/material';
import { AuthModes, type AuthMode } from '../types/AuthMode';

import LogoPng from '../../common/resources/logo.png';
import './Auth.css';

const content: Record<AuthMode, { title: string; description: string }> = {
  [AuthModes.LOGIN]: {
    title: 'Login',
    description: 'Enter your credentials to continue',
  },
  [AuthModes.REGISTER]: {
    title: 'Register',
    description: 'Enter your credentials to create an account',
  },
};

export const Auth = () => {
  const [mode, setMode] = useState<AuthMode>(AuthModes.LOGIN);

  return (
    <>
      <div
        id="auth-container"
        className="container d-flex align-items-center justify-content-center h-100"
      >
        <div
          className="shadow p-4 rounded-xl rounded-3 h-40 pb-6"
          style={{ minWidth: 400 }}
        >
          <Card
            title={content[mode].title}
            description={content[mode].description}
            preContent={
              <div className="d-flex justify-content-center">
                <img src={LogoPng} alt="Gapsi Logo" className="mb-4" />
              </div>
            }
          >
            <div className="mb-4 d-flex">
              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs
                  value={mode}
                  onChange={(_, evt: AuthMode) => setMode(evt)}
                  aria-label="basic tabs example"
                  sx={{
                    '& .MuiButtonBase-root': {
                      width: '50%',
                    },
                  }}
                >
                  <Tab
                    label="Login"
                    value={AuthModes.LOGIN}
                    icon={<em className="fa-regular fa-paper-plane"></em>}
                    iconPosition="start"
                  />
                  <Tab
                    label="Register"
                    value={AuthModes.REGISTER}
                    icon={<em className="fa-solid fa-user-plus"></em>}
                    iconPosition="start"
                  />
                </Tabs>
              </Box>
            </div>

            <div className="auth-container">
              <div
                className={`auth-panel h-100 ${
                  mode === AuthModes.LOGIN ? 'active' : 'inactive-up'
                }`}
              >
                <Login />
              </div>

              <div
                className={`auth-panel h-100 ${
                  mode === AuthModes.REGISTER ? 'active' : 'inactive-down'
                }`}
              >
                <Register setMode={setMode} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
