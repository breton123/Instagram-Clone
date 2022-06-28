import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';

function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = []
        for (let i = 0; i < 5; i++) {
            var temp = []
            temp.push(i);
            temp.push(faker.name.findName());
            temp.push(faker.image.avatar());
            temp.push(faker.company.companyName());
            suggestions.push(temp);
          }

        setSuggestions(suggestions);
    }, []);
        
    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>

            {suggestions.map((profile) => (
                <div key={profile[0]} className="flex items-center justify-between mt-3">

                    <img className="w-10 h-10 rounded-full p-[2px]" src={profile[2]}></img>
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">{profile[1]}</h2>
                        <h3 className="text-xs text-gray-400">Works at {profile[3]}</h3>
                    </div>
                    <btn className="text-blue-400 font-semibold text-xs cursor-pointer">Follow</btn>
                </div>
            ))}
        </div>
    )
}

export default Suggestions;