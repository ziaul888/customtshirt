import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useDesignStore } from '@/stores';

const emojis = [
  '😀', '😂', '😍', '😊', '😁', '😅', '😭', '🥰', '😎', '🤔', '😇', '👍', '👎',
  '👏', '🙌', '🙏', '🤝', '👌', '🤘', '🎉', '🎊', '🥳', '🔥', '💯', '✨', '🌟', '💥', '💡',
  '🚀', '📚', '🧠', '📈', '🛠️', '📝', '🐶', '🐱', '🐼', '🦄', '🌈', '🌸', '🌞', '🌙', '🌍',
  '🍕', '🍔', '🍟', '🍩', '🍎', '☕', '🍺', '🍉', '❤️', '💔', '💕', '💖', '💘', '💞', '😘',
  '💋', '📸', '🎮', '🎵', '🎧', '💻', '📱', '✈️', '🏆'
];

const AddEmoji: React.FC = () => {
  const { addEmoji } = useDesignStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleSelect = (emoji: string) => {
    setSelected(emoji);
  };
  const handleAddEmoji = () => {
    if (selected) {
      addEmoji(selected);
    }
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
            className={`text-[24px] p-2 rounded-[4px] bg-background border cursor-pointer ${
              selected === emoji ? 'border-primary border-2' : 'border-border border'
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
          variant="outline"
          className="h-[55px] rounded-[4px] cursor-pointer"
        >
          <span className="text-[16px]">{showAll ? 'Show Less' : '+ More'}</span>
        </Button>
      </div>

      <Button
        onClick={handleAddEmoji}
        variant="outline"
        className="w-full h-[48px] rounded-[4px] cursor-pointer"
      >
        <span className="text-[16px]">Add Emoji</span>
      </Button>
    </div>
  );
};

export default AddEmoji;
