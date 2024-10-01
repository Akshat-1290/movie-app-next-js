"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useAuth } from "@/app/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const FavoriteButton = ({ movieid }: { movieid: string }) => {
  const { user, setIsAuthModalOpen } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().favorites.includes(movieid)) {
          setIsFavorite(true);
        }
      }
    };
    checkFavorite();
  }, [user, movieid]);

  const handleFavorite = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        if (userDoc.data().favorites.includes(movieid)) {
          setIsFavorite(false);
          await updateDoc(userDocRef, {
            favorites: userDoc
              .data()
              .favorites.filter((id: string) => id !== movieid),
          });
        } else {
          setIsFavorite(true);
          await updateDoc(userDocRef, {
            favorites: [...userDoc.data().favorites, movieid],
          });
        }
      }
    } else {
      setIsAuthModalOpen(true);
    }
  };
  return (
    <Button
      variant="link"
      className="mb-6 text-blue-500 hover:text-blue-600 p-0"
      onClick={handleFavorite}
    >
      <Bookmark className="w-5 h-5 mr-2" />
      {isFavorite ? "Remove from Favourites" : "Add to Favourites"}
    </Button>
  );
};

export default FavoriteButton;
