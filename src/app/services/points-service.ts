import { Injectable } from '@angular/core';
import { GamePlayed } from '../../shared/model/game-played';
import { DocumentSnapshot, Firestore, QuerySnapshot, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { gamePlaydConverter } from './converters/gamePlayd-converter';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  private gamePoints: GamePlayed[] = [];

  constructor(private firestoreService: Firestore) {
  }

  async getGamePoints(): Promise<GamePlayed[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'gamePlayd'
    ).withConverter(gamePlaydConverter);

    const querySnapshot: QuerySnapshot<GamePlayed> = await getDocs(
      collectionConnection
    );
    const result: GamePlayed[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<GamePlayed>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });

    return result;
  }

   async addGamePlayed(gamePlayed: GamePlayed) {
    await addDoc(
      collection(this.firestoreService, 'gamePlayd').withConverter(
        gamePlaydConverter
      ),
      gamePlayed
    );
  }
}

