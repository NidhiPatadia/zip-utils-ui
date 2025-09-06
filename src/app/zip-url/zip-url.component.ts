import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';

@Component({
  selector: 'app-zip-url',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zip-url.component.html',
  styleUrl: './zip-url.component.css',
})
export class ZipUrlComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  readonly urlForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const URL_REGEX =
      /^(?:(?:https?:\/\/)?(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[A-Za-z0-9-]+\.)+[A-Za-z]{1,}))(?::\d{1,5})?(?:[\/?#][^\s]*)?$/i;

    this.urlForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(URL_REGEX)]],
    });
  }

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_URL,
      pageDescription: PAGE_DESCRIPTION.ZIP_URL,
    });
  }

  onSubmit() {
    if (this.urlForm.valid) {
      const url = this.urlForm.value.url;
      console.log('URL to shorten:', url);
      // 👉 Call your shortening service here
    }
  }
}
