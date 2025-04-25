import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Wanted to buy macbook?',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Wanted to buy DELL?',
                1000,
                'Wanted to buy Lenovo?',
                1000,
                'Wanted to buy Vivobook?',
                1000,
                'Lapify.com',
                1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '90px', display: 'inline-block' }}
            repeat={0}
        />
    );
};
export default ExampleComponent