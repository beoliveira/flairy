export default async function handler(req, res) {

  const story = "Title: Mary and the Magical Kingdom of Candy\n Once upon a time, there lived a 6 year old non-binary named Mary who was always full of curiosity and excitement. Every night, Mary would go to bed with lots of dreams and possibilities. One night, Mary had the most vivid dream of all: she was in an enchanted kingdom full of all sorts of tasty delights and sugary treats. It was a magical place called the Candy World.\n Mary couldnt contain her curiosity and excitement, so she decided to explore the candy kingdom. Soon, she encountered many interesting and exciting characters that were from all over the world. There was a very friendly lilac dragon named Flamey, an adventurous monkey named Coco, and a wise and ancient marshmallow man called Grand. \n The trio decided to explore the candy kingdom together. All of a sudden, their adventure was interrupted when a harsh voice called out, “Unruly children! You shall not escape my wrath!” It was the powerful candy queen, Queen Frostine. She was determined to stop our adventurers and keep them from exploring any further. \n The Queen suddenly cast a powerful spell on Mary and her friends that would keep them from exploring any further. It was a tricky spell that required a special combination of words to break. The trio needed to work together and use their imagination and knowledge to break the spell and get back to exploring the Candy World.\n After a few days, the friends were able to break the spell and make their way back to the Candy World. However, Queen Frostine had set up traps to stop them. Through teamwork and creative problem solving, Mary and her friends were able to overcome the obstacles set up by the Queen and make it to the end of the kingdom. \n At the end of the kingdom, the three friends encountered one final challenge: a giant gumdrop castle. Mary and her friends had to use all of their strength, courage and determination to scale the castle walls and make it to the top. Fortunately, with help from Flamey and Coco, Mary was able to reach the top. \n At the top of the castle, Mary discovered something amazing: a book full of secret candy recipes that the queen had been hiding from the world. With this newfound knowledge, the trio was able to create the most delicious treats in all of the Candy World! \n After a long journey, Mary and her friends had learned an important lesson: with friendship and teamwork, anything is possible. They had also discovered the true magic of the Candy World-- the power to create wonderful things with imagination, courage and a little help from one another. \n The trio shared many laughs as they waved goodbye to each other, knowing that their adventure would always be remembered. Mary made her way back home, her head filled with dreams of the candy kingdom and her heart filled with new found knowledge. \n THE END";
    try {
      const data = req.body;
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:oSkScC2E/generate', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      const responseData = await response.json(); 
      res.status(200).json({ message: responseData.message });
      // res.status(200).json({ message: story });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting form data' });
    }
  }

