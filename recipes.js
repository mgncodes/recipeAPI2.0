const Recipe = require('./recipeSchema')

exports.addRecipe = async (data) => {
    try {
        const newRecipe = new Recipe(data)
        const savedRecipe = newRecipe.save()
        if (!savedRecipe) {
            throw new Error('Recipe could not be saved');
        } return { error: null }
    } catch (error) {
        return { error: error.message }
    }
}
exports.getRecipe = async () => {
    try {
        const recipes = await Recipe.find({});
        if (!recipes) throw new Error('Recipe not found');
        return { error: null, data: recipes };
    } catch (error) {
        return { error: error.message, data: null }
    }
}
exports.editRecipe = async (id, data) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, data, { new: true });
        if (!updatedRecipe) throw new Error('Failed to edit recipe');
        return { error: null, data: updatedRecipe };
    } catch (error) {
        return { error: error.message, data: null };
    }
}
exports.deleteRecipe = async (id) => {
    try {
        const isDeleted = await Recipe.findByIdAndDelete(id);
        if (!isDeleted) throw new Error('Failed to delete recipe');
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
}