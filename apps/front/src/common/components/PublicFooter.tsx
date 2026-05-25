import { Button, IconButton, Typography } from '@mui/material';

import GapsiLogoFooter from '../resources/LogoFooter.png';

export const PublicFooter = () => {
  return (
    <footer className="bg-dark text-light mt-auto">
      <section className="container py-5">
        <div className="row gy-4">
          <div className="col-12 col-md-4">
            <Typography variant="h5" className="mb-3">
              Boletín de Noticias
            </Typography>

            <Typography variant="body2" className="text-secondary mb-2">
              Mantente informado de las nuevas ofertas de GAPSI.
            </Typography>

            <Typography variant="body2" className="text-secondary mb-4">
              Ingresa tu dirección de e-mail y suscríbete a nuestro boletín.
            </Typography>
          </div>

          <div className="col-12 col-md-4">
            <Typography variant="h5" className="mb-3">
              Datos de Contacto
            </Typography>

            <Typography
              variant="subtitle1"
              className="mb-2"
              sx={{ color: '#0d6efd', fontWeight: 500 }}
            >
              Ciudad de México
            </Typography>

            <div className="d-flex gap-2 mb-3 text-secondary">
              <i className="fa-solid fa-location-dot mt-1"></i>
              <Typography variant="body2">
                Indiana #260 - 405 Col. Ciudad de los deportes, Del. Benito Juárez CP.
                03710, CDMX
              </Typography>
            </div>

            <div className="d-flex gap-2 mb-3 text-secondary">
              <i className="fa-solid fa-phone mt-1"></i>
              <Typography variant="body2">Tel: +52 55 9000-3959</Typography>
            </div>

            <div className="d-flex gap-2 text-secondary">
              <i className="fa-solid fa-envelope mt-1"></i>
              <Typography variant="body2">Email: contacto@gapsi.com.mx</Typography>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <Typography variant="h5" className="mb-3">
              Síguenos en:
            </Typography>

            <div className="d-flex gap-2">
              <IconButton className="bg-light" size="small">
                <i className="fa-brands fa-facebook-f fs-6"></i>
              </IconButton>

              <IconButton className="bg-light" size="small">
                <i className="fa-brands fa-twitter fs-6"></i>
              </IconButton>

              <IconButton className="bg-light" size="small">
                <i className="fa-brands fa-linkedin fs-6"></i>
              </IconButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-4">
        <div className="container d-flex flex-column flex-md-row align-items-center gap-3">
          <img
            src={GapsiLogoFooter}
            alt="APSI"
            style={{ width: 60, objectFit: 'contain' }}
          />

          <Typography variant="body2" className="text-secondary">
            © Copyright 2015.
          </Typography>
        </div>
      </section>
    </footer>
  );
};
