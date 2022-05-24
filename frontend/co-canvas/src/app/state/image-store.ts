import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CloneService } from '../clone.service';
import Image from '../models/image';

@Injectable()
export class ImageStoreService{

    constructor(private cloneService: CloneService) { }

    private loading$ = new BehaviorSubject<boolean>(false);
    private images$ = new BehaviorSubject<Image[]>([]);

    isLoading$(): Observable<boolean> {
        return this.loading$.asObservable();
    }

    setLoading(isLoading: boolean): void {
        this.loading$.next(isLoading);
    }

    get$(): Observable<Image[]> {
        return this.images$.asObservable();
    }

    set(images: Image[]): void {
        const clone = this.cloneService.deepClone(images);
        this.images$.next(clone);
    }

    add(image: Image): void {
        const policies = this.images$.getValue();
        policies.unshift(image);
    
        const clone = this.cloneService.deepClone(policies);
        this.images$.next(clone);
      }
}