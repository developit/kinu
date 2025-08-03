import {Button, Card, Input, TabList, Tab, TabPanel, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink} from 'pui';
import {useState} from 'preact/hooks';

export default function Home() {
  return (
    <div class="home">
      <NavigationMenu class="home-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/components">Components</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <section class="hero">
        <h1>Beautifully designed components</h1>
        <p>Accessible components built with Preact and CSS.</p>
        <div class="hero-actions">
          <Button href="/components">Get Started</Button>
          <Button variant="outline" href="https://github.com/">GitHub</Button>
        </div>
      </section>
      <section class="features">
        <Card>
          <h3>Input Example</h3>
          <Input placeholder="Type here" />
        </Card>
        <Card>
          <h3>Tabs Example</h3>
          <TabsExample />
        </Card>
      </section>
    </div>
  );
}

function TabsExample() {
  const [tab, setTab] = useState<'account' | 'password'>('account');
  return (
    <div>
      <TabList>
        <Tab aria-selected={tab === 'account'} onClick={() => setTab('account')}>
          Account
        </Tab>
        <Tab aria-selected={tab === 'password'} onClick={() => setTab('password')}>
          Password
        </Tab>
      </TabList>
      {tab === 'account' && <TabPanel>Make changes to your account here.</TabPanel>}
      {tab === 'password' && <TabPanel>Change your password here.</TabPanel>}
    </div>
  );
}
