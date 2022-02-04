import { Component, OnInit } from '@angular/core'
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import AuthService from '../services/auth.service'
import FirestoreService from '../services/firestore.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public products: any[] | undefined = []
  public subscription: any
  constructor(
    public firestoreService: FirestoreService,
    public authService: AuthService
  ) {
    const q = query(
      collection(this.firestoreService.firestore, 'products'),
      where('active', '==', true)
    )
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        this.subscription = await this.authService.GetCustomClaimRole()
        console.log(this.subscription)
        const q = query(
          collection(
            this.firestoreService.firestore,
            'products',
            doc.id,
            'prices'
          )
        )
        getDocs(q).then((querySnapshot) => {
          const price = querySnapshot.docs[0].data()
          const priceId = querySnapshot.docs[0].id
          this.products?.push({
            id: doc.id,
            name: doc.data()['name'],
            description: doc.data()['description'],
            price: price,
            priceId: priceId,
            images: doc.data()['images'],
          })
        })
      })
    })
  }

  ngOnInit(): void {}

  async Upgrade(plan: string) {
    if (this.authService.userData?.uid == undefined) return
    const price = this.products?.find((p) => p.id == plan).priceId
    const collRef = collection(
      this.firestoreService.firestore,
      'users',
      this.authService.userData.uid,
      'checkout_sessions'
    )
    const docRef = await addDoc(collRef, {
      price: price,
      success_url: window.location.href,
      cancel_url: window.location.href,
    })
    onSnapshot(docRef, (snap) => {
      const data = snap.data()
      if (!data) return
      if (data['error']) {
        deleteDoc(docRef)
        alert(`An error has occurred: ${data['error'].message}`)
      }
      if (data['url']) {
        window.location.assign(data['url'])
      }
    })
  }
}
