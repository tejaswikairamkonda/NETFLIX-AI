import express from 'express';
const router = express.Router();
const reviews = [];


router.get('/', (req, res) => res.json(reviews));
router.post('/', (req, res) => {
const { movieId, author, rating, comment } = req.body;
if (!movieId || !author) return res.status(400).json({ message: 'Missing fields' });
const review = { id: Date.now().toString(), movieId, author, rating: rating || 0, comment: comment || '' };
reviews.push(review);
res.status(201).json(review);
});


export default router;