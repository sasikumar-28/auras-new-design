import { useState, useEffect, useRef } from "react";

interface GeoLocation {
  latitude: number;
  longitude: number;
  city: string | null;
  country: string | null;
}

interface DeviceInfo {
  model: string;
  os: string;
}

interface ScreenResolution {
  width: number;
  height: number;
}

interface PushNotifications {
  enabled: boolean;
  lastNotificationReceived: string | null;
}

interface SessionMetadata {
  geoLocation: GeoLocation | null;
  platform: "web";
  webMetadata: {
    userAgent: string;
    os: string | null;
    ipAddress: string | null;
    screenResolution: ScreenResolution;
  };
  appVersion: string;
  pushNotifications: PushNotifications;
  mobileMetadata: {
    device: DeviceInfo;
    screenResolution: ScreenResolution;
  } | null;
  sessionDuration: number;
}

const useSessionTracker = (): SessionMetadata | null => {
  const [sessionMetadata, setSessionMetadata] = useState<SessionMetadata | null>(null);
  const sessionStartTime = useRef(Date.now());

  useEffect(() => {
    collectSessionData();
  }, []);

  async function collectSessionData() {
    const [geoLocation, ipAddress] = await Promise.all([
      getGeoLocation(),
      getIpAddress(),
    ]);

    function getBrowserName(userAgent: string): string {
      if (/Edg/i.test(userAgent)) return "Edge";
      if (/OPR/i.test(userAgent)) return "Opera";
      if (/Chrome/i.test(userAgent)) return "Chrome";
      if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent))
        return "Safari";
      if (/Firefox/i.test(userAgent)) return "Firefox";
      if (/MSIE|Trident/i.test(userAgent)) return "Internet Explorer";
      return "Unknown";
    }

    const userAgent = navigator.userAgent;
    const browserName = getBrowserName(userAgent);

    const isMobile = /Mobi|Android/i.test(userAgent);
    const osMatch = userAgent.match(/\((.*?)\)/);
    const os = osMatch ? osMatch[1] : null;

    const session: SessionMetadata = {
      geoLocation,
      platform: "web",
      webMetadata: {
        userAgent: browserName,
        os,
        ipAddress,
        screenResolution: {
          width: window.screen.width,
          height: window.screen.height,
        },
      },
      appVersion: "2.1.0",
      pushNotifications: {
        enabled: Notification.permission === "granted",
        lastNotificationReceived:
          Notification.permission === "granted"
            ? new Date().toISOString()
            : null,
      },
      mobileMetadata: isMobile
        ? {
            device: {
              model: getMobileModel(userAgent),
              os: getMobileOS(userAgent),
            },
            screenResolution: {
              width: window.screen.width,
              height: window.screen.height,
            },
          }
        : null,
      sessionDuration: Math.floor(
        (Date.now() - sessionStartTime.current) / 1000
      ),
    };

    setSessionMetadata(session);
  }

  function getMobileModel(ua: string): string {
    if (/iPhone/.test(ua)) return "iPhone";
    if (/Android/.test(ua)) return "Android Device";
    return "Unknown";
  }

  function getMobileOS(ua: string): string {
    const iosMatch = ua.match(/OS (\d+_\d+)/);
    const androidMatch = ua.match(/Android (\d+(?:\.\d+)?)/);
    if (iosMatch) return `iOS ${iosMatch[1].replace("_", ".")}`;
    if (androidMatch) return `Android ${androidMatch[1]}`;
    return "Unknown";
  }

  async function getGeoLocation(): Promise<GeoLocation | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = await getCityCountry(latitude, longitude);
          resolve({
            latitude,
            longitude,
            city: location?.city || null,
            country: location?.country || null,
          });
        },
        () => resolve(null)
      );
    });
  }

  async function getCityCountry(lat: number, lng: number): Promise<{ city: string | null; country: string | null } | null> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return {
        city:
          data.address.city ||
          data.address.town ||
          data.address.village ||
          null,
        country: data.address.country || null,
      };
    } catch {
      return null;
    }
  }

  async function getIpAddress(): Promise<string | null> {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip || null;
    } catch {
      return null;
    }
  }

  return sessionMetadata;
};

export default useSessionTracker;
