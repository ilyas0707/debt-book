const { Router } = require("express")
const Profile = require("../models/Profile")
const debt = require("./../middleware/debt.middleware")
const router = Router()

router.post("/add", debt, async (req, res) => {
    try {

        const { name, specific } = req.body

        const client = await Profile.findOne({ name })

        if (client) {
            return res.status(400).json({ message: `${name} уже создан(-а)` })
        }

        const profile = new Profile({
            name, specific
        })

        await profile.save()

        res.status(201).json({ profile, message: "Клиент добавлен!" })

    } catch (e) {
        res.status(500).json({ message: "Поля не должны быть пустыми!" })
    }
})

router.get("/:id", [],  async (req, res) => {
    try {
        await Profile.find((error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.post("/change", [], async (req, res) => {
    let d = new Date()
    let n = d.toISOString()
    try {
        const { name, balance } = req.body
        await Profile.findOneAndUpdate(
            { name: name },
            { $set: {balance: balance, date: n}},
            (err, data) => {
                if (err) {
                    return next(err)
                } else {
                    res.status(201).json({ message: "Данные измененны!" })
                }
            }
        )
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.delete('/delete/:id', [], async (req, res, next) => {
    try {
        await Profile.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    } 
})

module.exports = router