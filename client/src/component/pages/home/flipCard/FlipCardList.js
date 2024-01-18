import React from 'react';
import FlipCard from './FlipCard';

const FlipCardList = () => {
  const cards = [
    {
      id: 1,
      question: 'Why should you adopt?',
      answer: '"Adopting helps save lives, gives a home to animals in need, and promotes responsible pet ownership."',
    },
    {
      id: 2,
      question: 'What are the benefits of adoption?',
      answer: '"Adopted pets often come vaccinated, and with a health check. They bring joy, companionship, and gratitude."',
    },
    {
      id: 3,
      question: 'How does adoption impact communities?',
      answer: '"Adoption reduces the number of stray animals, eases the shelters, and fosters a sense of community responsibility."',
    },
    {
      id: 4,
      question: 'How does adoption impact self-being?',
      answer: '"Adoption offers companionship, reduces anxiety, and contributes to mental well-being."',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-28 gap-y-4  ">
      {cards.map((card) => (
        <FlipCard key={card.id} question={card.question} answer={card.answer} />
      ))}
    </div>
  );
};

export default FlipCardList;
