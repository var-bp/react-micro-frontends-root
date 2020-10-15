import React, { useEffect, useCallback, useRef } from 'react';
import { History } from 'history';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { MountPoint } from './MicroFrontend.style';

interface MicroFrontendProps {
  name: string;
  host: string;
  history: History;
}

const MicroFrontend = ({ name, host, history }: MicroFrontendProps): JSX.Element => {
  const injectedScriptsRef = useRef(0);

  const parentRouteMatch = useRouteMatch();

  const isScriptsInjected = useCallback(() => {
    const arr = [...Array(injectedScriptsRef.current).keys()];
    return arr.length
      ? arr.every(
          (i: number) => !!document.querySelector(`#micro-frontend-script-${name}-${i + 1}`),
        )
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
      data.entrypoints.forEach((entrypoint: string, i: number) => {
        const script = document.createElement('script');
        script.id = `micro-frontend-script-${name}-${i + 1}`;
        script.crossOrigin = 'anonymous';
        script.defer = true;
        script.onload = () => {
          injectedScriptsRef.current += 1;
          if (data.entrypoints.length === injectedScriptsRef.current) {
            renderMicroFrontend();
          }
        };
        script.onerror = () => {
          // Failed to mount micro-frontend
          history.push('/fail-to-mount');
        };
        script.src = `${host}/${entrypoint}`;
        document.head.appendChild(script);
      });
    } catch (err) {
      // Failed to mount micro-frontend
      history.push('/fail-to-mount');
    }
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
        } catch (error) {
          // Micro-frontend did not unmount cleanly - ensure all effects return valid cleanup functions
        }
      }
    };
  }, [host, name, injectScripts, unmountMicroFrontend, renderMicroFrontend, isScriptsInjected]);

  return <MountPoint id={`${name}-container`} />;
};

export default MicroFrontend;
