import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatCheckboxModule, MatListModule, MatCardModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm!: FormGroup;
  editingId: string | null = null;
  editingTitle = '';
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => { this.tasks = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Erreur : ' + err.message; this.loading = false; }
    });
  }

  addTask(): void {
    if (this.taskForm.invalid) return;
    const title = this.taskForm.value.title.trim();
    this.taskService.addTask(title).subscribe({
      next: (task) => { this.tasks.unshift(task); this.taskForm.reset(); },
      error: (err) => this.errorMessage = err.message
    });
  }

  toggleCompleted(task: Task): void {
    if (!task._id) return;
    this.taskService.updateTask(task._id, { completed: !task.completed })
      .subscribe({
        next: (updated) => Object.assign(task, updated),
        error: (err) => this.errorMessage = err.message
      });
  }

  startEdit(task: Task): void {
    if (!task._id) return;
    this.editingId = task._id;
    this.editingTitle = task.title;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingTitle = '';
  }

  saveEdit(task: Task): void {
    if (!task._id || !this.editingTitle.trim()) return;
    this.taskService.updateTask(task._id, { title: this.editingTitle.trim() })
      .subscribe({
        next: (updated) => { Object.assign(task, updated); this.cancelEdit(); },
        error: (err) => this.errorMessage = err.message
      });
  }

  deleteTask(task: Task): void {
    if (!task._id) return;
    if (!confirm(`Supprimer « ${task.title} » ?`)) return;
    this.taskService.deleteTask(task._id).subscribe({
      next: () => this.tasks = this.tasks.filter(t => t._id !== task._id),
      error: (err) => this.errorMessage = err.message
    });
  }
}