import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  events: any[] = [];
  selectedEvent: any = null;
  eventForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('http://localhost:3000/events').subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  selectEvent(event: any) {
    this.selectedEvent = event;
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.http
        .post('http://localhost:3000/events', this.eventForm.value)
        .subscribe(
          (response) => {
            this.loadEvents();
            this.eventForm.reset();
          },
          (error) => {
            console.error('Error creating event:', error);
          }
        );
    }
  }
}
