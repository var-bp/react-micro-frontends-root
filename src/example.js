// Gtz.Web.Tms.Base/src/components/app/microfrontend/microfrontend.jsx
// async/await is optional
const MicroFrontend = ({ name, host, history }) => {
  const injectedScriptsRef = useRef(0);

  const parentRouteMatch = useRouteMatch();

  const isScriptsInjected = useCallback(() => {
    const arr = [...Array(injectedScriptsRef.current).keys()];
    return arr.length
      ? arr.every((i) => !!document.querySelector(`#micro-frontend-script-${name}-${i + 1}`))
      : false;
  }, [name]);

  const renderMicroFrontend = useCallback(() => {
    window[`render${name}`](`${name}-container`, history, parentRouteMatch);
  }, [history, name, parentRouteMatch]);

  const unmountMicroFrontend = useCallback(() => {
    window[`unmount${name}`](`${name}-container`);
  }, [name]);

  const injectScripts = useCallback(async () => {
    try {
      window[`hostOf${name}`] = host;
      const { data } = await axios.get(`${host}/asset-manifest.json`);
      data.entrypoints.forEach((entrypoint, i) => {
        const script = document.createElement('script');
        script.id = `micro-frontend-script-${name}-${i + 1}`;
        script.crossOrigin = '';
        script.defer = true; // !
        script.onload = () => {
          injectedScriptsRef.current += 1;
          if (data.entrypoints.length === injectedScriptsRef.current) {
            renderMicroFrontend();
          }
        };
        script.onerror = () => {}; // !
        script.src = `${host}/${entrypoint}`;
        document.head.appendChild(script);
      });
    } catch (error) {}
  }, [history, host, name, renderMicroFrontend]);

  useEffect(() => {
    if (isScriptsInjected()) {
      renderMicroFrontend();
    } else {
      injectScripts();
    }
    return () => {
      if (isScriptsInjected()) {
        try {
          unmountMicroFrontend();
        } catch (error) {}
      }
    };
  }, [host, name, injectScripts, unmountMicroFrontend]);

  return <MicroFrontendMountPoint id={`${name}-container`} />;
};


// Gtz.Web.Tms.SalesOrderBoard/package.json
{
  "name": "very-unique-name-per-repository", // only - _
}


// Gtz.Web.Tms.SalesOrderBoard/config-overrides.js
module.exports = {
  webpack: override(
    disableChunk(), // delete it
  ),
};
