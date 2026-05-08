import { useEffect } from 'react';

export const Analytics: React.FC = () => {
  useEffect(() => {
    // Simulated basic analytics tracking
    // In production, you would integrate with Google Analytics, Mixpanel, etc.

    const trackPageView = () => {
      console.log('Analytics: Page view tracked', {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      });
    };

    const trackEvent = (eventName: string, properties?: Record<string, any>) => {
      console.log('Analytics: Event tracked', {
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      });
    };

    // Track initial page view
    trackPageView();

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = Math.floor(scrollPercentage / 25) * 25;

        if (maxScrollDepth > 0 && maxScrollDepth % 25 === 0) {
          trackEvent('scroll_depth', { depth: maxScrollDepth });
        }
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', { seconds: timeSpent });
    };

    // Track clicks on CTA buttons
    const handleCTAClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const buttonText = target.textContent || target.closest('button')?.textContent;
        trackEvent('cta_click', { button: buttonText });
      }
    };

    // Track form submissions
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      const formId = form.id || 'unknown';
      trackEvent('form_submit', { form: formId });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', trackTimeOnPage);
    document.addEventListener('click', handleCTAClick);
    document.addEventListener('submit', handleFormSubmit);

    // Performance metrics
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (perfData) {
            trackEvent('page_performance', {
              loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
              domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
              timeToFirstByte: Math.round(perfData.responseStart - perfData.requestStart),
            });
          }
        }, 0);
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      document.removeEventListener('click', handleCTAClick);
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return null;
};
