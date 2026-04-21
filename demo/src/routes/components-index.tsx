import {Card} from 'kinu';
import {DocsLayout} from '../app';
import {fallbackEntry} from '../docs-data';
import {useLocation} from 'preact-iso';
import {useEffect} from 'preact/hooks';

export default function ComponentsIndex() {
  const location = useLocation();

  // Redirect to first component if available
  useEffect(() => {
    if (fallbackEntry && location.url === '/components') {
      location.route(`/components/${fallbackEntry.slug}`);
    }
  }, [location]);

  if (fallbackEntry) return null;

  return (
    <DocsLayout>
      <Card>
        <h1>Components</h1>
        <p>Select a component from the sidebar to view its documentation.</p>
      </Card>
    </DocsLayout>
  );
}
