import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const emojis = [
  '😀', '😂', '😍', '😊', '😁', '😅', '😭', '🥰', '😎', '🤔', '😇', '👍', '👎',
  '👏', '🙌', '🙏', '🤝', '👌', '🤘', '🎉', '🎊', '🥳', '🔥', '💯', '✨', '🌟', '💥', '💡',
  '🚀', '📚', '🧠', '📈', '🛠️', '📝', '🐶', '🐱', '🐼', '🦄', '🌈', '🌸', '🌞', '🌙', '🌍',
  '🍕', '🍔', '🍟', '🍩', '🍎', '☕', '🍺', '🍉', '❤️', '💔', '💕', '💖', '💘', '💞', '😘',
  '💋', '📸', '🎮', '🎵', '🎧', '💻', '📱', '✈️', '🏆'
];

interface AddEmojiProps {
  onAdd: (emoji: string) => void;
}

const AddEmoji: React.FC<AddEmojiProps> = ({ onAdd }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleSelect = (emoji: string) => {
    setSelected(emoji);
    onAdd(emoji);
  };

  const handleToggleMore = () => {
    setShowAll((prev) => !prev);
  };

  const visibleEmojis = showAll ? emojis : emojis.slice(0, 22);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {visibleEmojis.map((emoji) => (
          <button
            key={emoji}
            className={`text-[24px] p-2 rounded-[4px] bg-white border cursor-pointer ${
              selected === emoji ? 'border-blue-600 border-2' : 'border-gray-300 border'
            }`}
            onClick={() => handleSelect(emoji)}
            aria-label={`Add ${emoji}`}
            type="button"
          >
            {emoji}
          </button>
        ))}

        <Button
          onClick={handleToggleMore}
          className="h-[55px] rounded-[4px] bg-white text-black border border-gray-200 hover:bg-black hover:text-white cursor-pointer"
        >
          <span className="text-[16px]">{showAll ? 'Show Less' : '+ More'}</span>
        </Button>
      </div>

      <Button
        // Optional: trigger another action
        className="w-full h-[48px] rounded-[4px] bg-white text-black border border-gray-400 hover:bg-black hover:text-white cursor-pointer"
      >
        <span className="text-[16px]">Add Emoji</span>
      </Button>
    </div>
  );
};

export default AddEmoji;
