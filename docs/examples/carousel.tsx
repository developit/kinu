import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'kinu';

export function Demo() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 1
        </CarouselItem>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #6bcf7f, #4ecdc4)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 2
        </CarouselItem>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #45b7d1, #96ceb4)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 3
        </CarouselItem>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #a8e6cf, #dcedc1)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 4
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious>‹</CarouselPrevious>
      <CarouselNext>›</CarouselNext>
    </Carousel>
  );
}

export const code = `<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
    <CarouselItem>Slide 4</CarouselItem>
  </CarouselContent>
  <CarouselPrevious>‹</CarouselPrevious>
  <CarouselNext>›</CarouselNext>
</Carousel>`;

export default {Demo, code};
