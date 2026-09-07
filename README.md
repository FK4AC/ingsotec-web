# INGSOTEC — Sitio web

Sitio web corporativo de INGSOTEC S.A.S., construido como HTML/CSS/JS estático (sin build step ni dependencias).

## Estructura

```
index.html          Inicio
servicios.html       Portafolio de servicios
enfoque.html          Metodología de trabajo
nosotros.html         Quiénes somos
casos-exito.html      Casos de éxito (filtrables por ?empresa=)
contacto.html         Formulario de contacto (Web3Forms)
privacidad.html       Aviso de privacidad
404.html              Página de error 404
css/styles.css         Estilos del sitio
js/main.js             Menú móvil, envío del formulario, animaciones al hacer scroll
assets/                Imágenes, íconos, logo e imagen para redes sociales (og-image.png)
robots.txt            Reglas para crawlers
sitemap.xml            Mapa del sitio
site.webmanifest       Metadatos PWA / íconos
```

## Desarrollo local

No requiere instalación. Basta con servir la carpeta como archivos estáticos, por ejemplo:

```bash
python3 -m http.server 8000
```

y abrir `http://localhost:8000`.

## Despliegue

El sitio es 100% estático: puede publicarse en cualquier hosting de archivos estáticos (GitHub Pages,
Netlify, Vercel, Cloudflare Pages, un bucket S3, etc.) apuntando la raíz del repositorio como raíz del
sitio, sirviendo `404.html` como página de error personalizada.

## Formulario de contacto

El formulario en `contacto.html` envía los datos a [Web3Forms](https://web3forms.com) usando la clave
pública (`access_key`) embebida en el HTML — es la forma esperada de uso de ese servicio (la clave
identifica el destino del formulario, no otorga acceso a datos). Si se necesita cambiar el destinatario,
hay que generar una nueva clave en Web3Forms y reemplazarla en `contacto.html`.

## Notas de mantenimiento

- El dominio canónico usado en meta tags, `sitemap.xml` y `robots.txt` es `https://ingsotec.co`. Si el
  dominio cambia, hay que actualizarlo en esos archivos y en las etiquetas `<link rel="canonical">` y
  `og:url` de cada página.
- `assets/og-image.png` es la imagen que se muestra al compartir el sitio en redes sociales/WhatsApp.
  Se generó a partir del isotipo de la marca; si cambia el logo o los colores, regenerarla.
