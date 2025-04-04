import { useState, useEffect } from "react";

interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  country: string | null;
}

interface PushNotifications {
  enabled: boolean;
  lastNotificationReceived: string | null;
}

interface ScreenResolution {
  width: number;
  height: number;
}

interface WebMetaData {
  os: string | null;
  appVersion: string;
  pushNotifications: PushNotifications;
  screenResolution: ScreenResolution;
  sessionDuration: number;
}

interface SessionMetadata {
  geoLocation: GeoLocation | null;
  platform: string; // Always "web"
  webMetaData: WebMetaData;
}

const useSessionTracker = (): SessionMetadata => {
  const [geoData, setGeoData] = useState<GeoLocation | null>(null);
  const [pushEnabled, setPushEnabled] = useState<boolean>(Notification.permission === "granted");
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const sessionStartTime = useState(Date.now())[0];

  useEffect(() => {
    requestLocationPermission();
    requestPushNotificationPermission();
  }, []);

  /** Request Location Permission */
  function requestLocationPermission() {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported.");
      setLocationGranted(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLocationGranted(true);
        const { latitude, longitude } = position.coords;
        try {
          const location = await getCityCountry(latitude, longitude);
          setGeoData({
            latitude,
            longitude,
            city: location?.city || null,
            country: location?.country || null,
          });
        } catch (error) {
          console.error("Error fetching city/country:", error);
        }
      },
      (error) => {
        console.warn("Geolocation permission denied:", error);
        setLocationGranted(false);
      }
    );
  }

  /** Request Push Notification Permission */
  function requestPushNotificationPermission() {
    if (!("Notification" in window)) {
      console.warn("Push Notifications are not supported.");
      return;
    }

    Notification.requestPermission().then((permission) => {
      setPushEnabled(permission === "granted");
    });
  }

  function generateSessionMetadata(): SessionMetadata {
    const userAgent = navigator.userAgent;
    let os: string | null = null;

    if (/Mac/i.test(userAgent)) {
      os = "MacOS";
    } else if (/Windows/i.test(userAgent)) {
      os = "Windows";
    } else if (/Linux/i.test(userAgent)) {
      os = "Linux";
    }

    return {
      geoLocation: locationGranted === false ? null : geoData,
      platform: "web",
      webMetaData: {
        os,
        appVersion: "2.1.0",
        pushNotifications: {
          enabled: pushEnabled,
          lastNotificationReceived: pushEnabled ? new Date().toISOString() : null,
        },
        screenResolution: {
          width: window.screen.width,
          height: window.screen.height,
        },
        sessionDuration: Math.floor((Date.now() - sessionStartTime) / 1000),
      },
    };
  }

  async function getCityCountry(lat: number, lng: number): Promise<{ city: string; country: string } | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data.address) {
        return {
          city: data.address.city || data.address.town || data.address.village || null,
          country: data.address.country || null,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching city/country:", error);
      return null;
    }
  }

  return generateSessionMetadata();
};

export default useSessionTracker;
