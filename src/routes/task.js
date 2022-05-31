//1 - requerer o express
const express = require('express');
//2 - requerer o model
const Checklist = require('../models/checklist');
const simpleRouter = express.Router();
const Task = require('../models/task');
//3 - criar a rota
const checklistDepedentRoute=express.Router();

//CRIAR AS ROTAS
//1 - criar uma task nova - usa o GET porque é para abrir a pg de formulário
checklistDepedentRoute.get('/:id/tasks/new', async (req, res) => {
    try{
        //mostrar uma task vazia para deixar o formulário em branco
        const task = new Task();
        //renderizar a tela tasks/new - puxando esses parâmetros.
        res.status(200).render('tasks/new', {checklistId: req.params.id, task: task})
    }catch (error){
        res.status(422).render('pages/error', {errors: 'Erro ao carregar o formulário'})
    }
})

simpleRouter.delete("/:id", async(req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.tasks.indexOf(task._id);
        checklist.tasks.slice(taskToRemove, 1);
        checklist.save();
        res.redirect(`/checklists/${checklist._id}`);
    } catch (error) {
        res.status(422).render('pages/error', {errors: 'Erro ao remover uma tarefa'})
    }
})

checklistDepedentRoute.post('/:id/tasks', async (req, res) => {
    const { name } = req.body.task;
    const task = new Task({ name, checklist: req.params.id });
    try {
        await task.save();
        const checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);
        await checklist.save();
        res.redirect(`/checklists/${req.params.id}`)
    } catch (error) {
        const errors = error.errors;
        res.status(422).render('tasks/new', { task: { ...task, errors }, checklistId: req.params.id });
    }
})

simpleRouter.put("/:id", async(req, res) => {
    let task = await Task.findById(req.params.id);
    try {
        task.set(req.body.task);
        await task.save();
        res.status(200).json({task});
    } catch (error) {
        let errors = error.errors;
        res.status(422).json({task: {...errors}});
    }
})

//exportar a rota
module.exports = {
        checklistDepedent:checklistDepedentRoute,
        simple: simpleRouter
    }