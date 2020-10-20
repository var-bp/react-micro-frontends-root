import React, { useEffect, useLayoutEffect, useCallback, useRef, useState } from 'react';
import { History } from 'history';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';

interface MicroFrontendProps {
  name: string;
  host: string;
  history: History;
}

const MicroFrontend = ({ name, host, history }: MicroFrontendProps): JSX.Element => {
  const injectedScriptsRef = useRef(0);

  const parentRouteMatch = useRouteMatch();

  const [entrypoints, setEntrypoints] = useState([]);

  const isScriptsInjected = useCallback(() => {
    return !!document.querySelectorAll(`[id^="micro-frontend-script-${name}-"]`).length;
  }, [name]);

  const renderMicroFrontend = useCallback(() => {
    try {
      window[`render${name}`](`${name}-container`, history, parentRouteMatch);
    } catch (error) {
      // Failed to mount micro-frontend
    }
  }, [history, name, parentRouteMatch]);

  const unmountMicroFrontend = useCallback(() => {
    try {
      window[`unmount${name}`](`${name}-container`);
    } catch (error) {
      // Micro-frontend did not unmount cleanly - ensure all effects return valid cleanup functions
    }
  }, [name]);

  const fetchManifest = useCallback(async () => {
    try {
      window[`hostOf${name}`] = host;
      const { data } = await axios.get(`${host}/asset-manifest.json`);
      setEntrypoints(data.entrypoints);
    } catch (err) {
      // Failed to fetch asset manifest
    }
  }, [host, name]);

  const injectScripts = useCallback(() => {
    entrypoints.forEach((entrypoint: string, i: number) => {
      const script =
        document.querySelector(`#micro-frontend-script-${name}-${i + 1}`) ||
        document.createElement('script');
      script.id = `micro-frontend-script-${name}-${i + 1}`;
      script.crossOrigin = 'anonymous';
      script.defer = true;
      script.onload = () => {
        injectedScriptsRef.current += 1;
        if (entrypoints.length === injectedScriptsRef.current) {
          renderMicroFrontend();
        }
      };
      script.onerror = () => {
        // Failed to mount micro-frontend
      };
      script.src = `${host}/${entrypoint}`;
      document.head.appendChild(script);
    });
  }, [entrypoints, host, name, renderMicroFrontend]);

  useEffect(() => {
    fetchManifest();
  }, [fetchManifest]);

  useLayoutEffect(() => {
    if (entrypoints.length) {
      if (isScriptsInjected()) {
        renderMicroFrontend();
      } else {
        injectScripts();
      }
    }
    return () => {
      if (entrypoints.length && isScriptsInjected()) {
        unmountMicroFrontend();
      }
    };
  }, [entrypoints, injectScripts, unmountMicroFrontend, renderMicroFrontend, isScriptsInjected]);

  return <div id={`${name}-container`} />;
};

export default MicroFrontend;
