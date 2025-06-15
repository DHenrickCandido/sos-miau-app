const admin = require('firebase-admin');
const db = admin.firestore();

exports.createCat = async (req, res) => {
  try {
    const catData = req.body;
    const catRef = db.collection('cats').doc();

    catData.id = catRef.id;


    await catRef.set(catData);
    res.status(201).json(catData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCat = async (req, res) => {
  try {
    const catId = req.params.id;
    const doc = await db.collection('cats').doc(catId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'cat not found' });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRescueCats = async (req, res) => {
  try {
    console.log("Tentando buscar gatos resgatados...");
    const doc = await db.collection('cats').where('rescued', '==', 'Sim').get();
    console.log("Consulta Firestore executada. Documentos encontrados:", doc.size);

    if(doc.empty){
      console.log("Nenhum gato resgatado encontrado.");
      return res.status(200).json({ response: [] });
    }

    const rescueCats = [];
    doc.forEach(doc => {
      rescueCats.push({ id: doc.id, ...doc.data() });
    });
    console.log("Gatos resgatados encontrados:", rescueCats.length);
    res.status(200).json({response: rescueCats});
  } catch (error) {
    console.error("Erro no backend ao buscar gatos resgatados:", error.message);
    res.status(500).json({error: error.message});
  }
}

exports.updateCat = async (req, res) => {
  try {
    const catId = req.params.id;
    const updateData = req.body;
    const catRef = db.collection('cats').doc(catId);

    await catRef.update(updateData);

    const updatedDoc = await catRef.get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const catId = req.params.id;
    await db.collection('cats').doc(catId).delete();
    res.status(200).json({ message: 'cat was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCats = async (req, res) => {
  try {
    const catsSnapshot = await db.collection('cats').get();
    const cats = [];
    catsSnapshot.forEach(doc => {
      cats.push(doc.data());
    });
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
