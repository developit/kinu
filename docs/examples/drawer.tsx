import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Item,
  ScrollArea,
} from 'kinu';
import {useState} from 'preact/hooks';

const ANIMALS = [
  'Aardvark', 'Albatross', 'Alpaca', 'Armadillo', 'Axolotl',
  'Badger', 'Barn owl', 'Beaver', 'Bison', 'Bottlenose dolphin',
  'Capybara', 'Caracal', 'Cassowary', 'Chinchilla', 'Coati',
  'Dhole', 'Dugong', 'Echidna', 'Fennec fox', 'Flying squirrel',
  'Gharial', 'Gibbon', 'Harpy eagle', 'Hoatzin', 'Ibex',
  'Jerboa', 'Kakapo', 'Kinkajou', 'Lemur', 'Manatee',
  'Markhor', 'Narwhal', 'Numbat', 'Okapi', 'Pangolin',
  'Peregrine falcon', 'Quokka', 'Quoll', 'Red panda', 'Saiga',
  'Serval', 'Snow leopard', 'Sugar glider', 'Tapir', 'Tarsier',
  'Vaquita', 'Wombat', 'Xerus', 'Yak', 'Zorilla',
];

export function Demo() {
  const [picked, setPicked] = useState('Pangolin');
  return (
    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <p style={{margin: '0 0 1rem 0'}}>Drawer Content</p>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">Pick an animal ({picked})</Button>
        </DrawerTrigger>
        {/* --k-drawer-height gives the sheet a detent on touch: it opens half
            height, and a flick up expands it to the full list before the list
            itself starts scrolling. */}
        <DrawerContent style={{'--k-drawer-height': '50dvh'}}>
          <h3 style={{margin: '0 0 0.75rem 0', fontSize: '1rem'}}>
            {ANIMALS.length} animals
          </h3>
          <ScrollArea style={{maxHeight: '60vh'}}>
            {ANIMALS.map((animal) => (
              <DrawerClose key={animal}>
                <Item
                  selected={animal === picked}
                  onClick={() => setPicked(animal)}
                >
                  {animal}
                </Item>
              </DrawerClose>
            ))}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export const code = `<Drawer>
  <Drawer.Trigger><Button>Pick an animal</Button></Drawer.Trigger>
  {/* opens half height on touch, flick up for the rest */}
  <Drawer.Content style={{'--k-drawer-height': '50dvh'}}>
    <h3>50 animals</h3>
    <ScrollArea style={{maxHeight: '60vh'}}>
      {animals.map((animal) => (
        <Drawer.Close key={animal}>
          <Item onClick={() => setPicked(animal)}>{animal}</Item>
        </Drawer.Close>
      ))}
    </ScrollArea>
  </Drawer.Content>
</Drawer>`;

export default {Demo, code};
