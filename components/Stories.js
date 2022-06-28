import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";
import Story from "../components/Story";
import { useSession } from "next-auth/react";

function Stories() {
    const { data: session } = useSession();
    const [suggestions, setSuggestions] = useState([]);

    

    useEffect(() => {
        const suggestions = []

        for (let i = 0; i < 20; i++) {
            var temp = []
            temp.push(i);
            temp.push(faker.name.findName());
            temp.push(faker.image.avatar());
            suggestions.push(temp);
          }

        setSuggestions(suggestions);
    }, []);

    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
            {session && (
                <Story img={session.user.image} name={session.user.username} key={session.user.uid} />
            )}
            {suggestions.map((profile) => (
                <Story 
                key={profile[0]}
                name = {profile[1]}
                img = {profile[2]}
                />
            ))}
        </div>
    );
}
export default Stories;