<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h5>Products</h5>
                <Toolbar class="p-mb-4">
                    <template #left>
                        <Button
                            label="New"
                            icon="pi pi-plus"
                            class="p-button-success p-mr-2"
                            @click="openNew"
                        />
                        <Button
                            label="Delete"
                            icon="pi pi-trash"
                            class="p-button-danger"
                            :disabled="!selectedProducts || !selectedProducts.length"
                            @click="confirmDeleteSelected"
                        />
                    </template>

                    <template #right>
                        <FileUpload
                            mode="basic"
                            accept="image/*"
                            :max-file-size="1000000"
                            label="Import"
                            choose-label="Import"
                            class="p-mr-2 p-d-inline-block"
                        />
                        <Button
                            label="Export"
                            icon="pi pi-upload"
                            class="p-button-help"
                            @click="exportCSV($event)"
                        />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    v-model:selection="selectedProducts"
                    :value="products"
                    data-key="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rows-per-page-options="[5,10,25]"
                    current-page-report-template="Showing {first} to {last} of {totalRecords} products"
                >
                    <template #header>
                        <div class="table-header">
                            <h5 class="p-m-0">
                                Manage Products
                            </h5>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText
                                    v-model="filters['global']"
                                    placeholder="Search..."
                                />
                            </span>
                        </div>
                    </template>



                    <Column
                        selection-mode="multiple"
                        header-style="width: 3rem"
                    />
                    <Column
                        field="id"
                        header="ID"
                        sortable
                    />
                    <Column
                        field="name"
                        header="Name"
                        sortable
                    />
                    <Column
                        field="brand"
                        header="Brand"
                        sortable
                    />
                    <Column
                        field="tags"
                        header="Tags"
                        sortable
                    />
					
                    <Column>
                        <template #body="slotProps">
                            <Button
                                icon="pi pi-pencil"
                                class="p-button-rounded p-button-success p-mr-2"
                                @click="editProduct(slotProps.data)"
                            />
                            <Button
                                icon="pi pi-trash"
                                class="p-button-rounded p-button-warning"
                                @click="confirmDeleteProduct(slotProps.data)"
                            />
                        </template>
                    </Column>
                </DataTable>

                <Dialog
                    v-model:visible="productDialog"
                    :style="{width: '450px'}"
                    header="Product Details"
                    :modal="true"
                    class="p-fluid"
                >
                    <img
                        v-if="product.image"
                        :src="'assets/layout/images/product/' + product.image"
                        :alt="product.image"
                        class="product-image"
                    >
                    <div class="p-field">
                        <label for="name">Name</label>
                        <InputText
                            id="name"
                            v-model.trim="product.name"
                            required="true"
                            autofocus
                            :class="{'p-invalid': submitted && !product.name}"
                        />
                        <small
                            v-if="submitted && !product.name"
                            class="p-invalid"
                        >Name is required.</small>
                    </div>
                    <div class="p-field">
                        <label for="description">Description</label>
                        <Textarea
                            id="description"
                            v-model="product.description"
                            required="true"
                            rows="3"
                            cols="20"
                        />
                    </div>

                    <div
                        v-if="false"
                        class="p-field"
                    >
                        <label class="p-mb-3">Category</label>
                        <div class="p-formgrid p-grid">
                            <div class="p-field-radiobutton p-col-6">
                                <RadioButton
                                    id="category1"
                                    v-model="product.category"
                                    name="category"
                                    value="Accessories"
                                />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="p-field-radiobutton p-col-6">
                                <RadioButton
                                    id="category2"
                                    v-model="product.category"
                                    name="category"
                                    value="Clothing"
                                />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="p-field-radiobutton p-col-6">
                                <RadioButton
                                    id="category3"
                                    v-model="product.category"
                                    name="category"
                                    value="Electronics"
                                />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="p-field-radiobutton p-col-6">
                                <RadioButton
                                    id="category4"
                                    v-model="product.category"
                                    name="category"
                                    value="Fitness"
                                />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>
                    <div class="p-formgrid p-grid">
                        <div class="p-field p-col">
                            <label for="sku">SKU</label>
                            <InputText
                                id="sku"
                                v-model.trim="product.sku"
                                required="true"
                                :class="{'p-invalid': submitted && !product.sku}"
                            />
                        </div>
                        <div class="p-field p-col">
                            <label for="quantity">Brand</label>
                            <InputText
                                id="sku"
                                v-model.trim="product.brand"
                                required="true"
                                :class="{'p-invalid': submitted && !product.brand}"
                            />
                        </div>
                    </div>
                    <div class="p-formgrid p-grid">
                        <div class="p-field p-col">
                            <label for="tags">Tags</label>
                            <div class="p-col">
                                <Chip
                                    v-for="tag in product.tags"
                                    :key="tag"
                                    :label="tag"
                                />
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="hideDialog"
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="saveProduct"
                        />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deleteProductDialog"
                    :style="{width: '450px'}"
                    header="Confirm"
                    :modal="true"
                >
                    <div class="confirmation-content">
                        <i
                            class="pi pi-exclamation-triangle p-mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteProductDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteProduct"
                        />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deleteProductsDialog"
                    :style="{width: '450px'}"
                    header="Confirm"
                    :modal="true"
                >
                    <div class="confirmation-content">
                        <i
                            class="pi pi-exclamation-triangle p-mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="product">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteProductsDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteSelectedProducts"
                        />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button/Button';
import Dialog from 'primevue/dialog/Dialog';
import Toolbar from 'primevue/toolbar/Toolbar';
import FileUpload from 'primevue/fileupload/FileUpload';
import DataTable from 'primevue/datatable/DataTable';
import InputText from 'primevue/inputtext/InputText';
import Column from 'primevue/column/Column';
import RadioButton from 'primevue/radiobutton/RadioButton';
import Chip from 'primevue/chip/Chip';
import Textarea from 'primevue/textarea/Textarea';

export default {
    components: {
        Button,
        Dialog,
        Toolbar,
        FileUpload,
        DataTable,
        InputText,
        Column,
        RadioButton,
        Chip,
        Textarea
    },
    data() {
        return {
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: {},
            selectedProducts: null,
            filters: {},
            submitted: false
        }
    },
    computed: {
        products() {
            return this.$store.getters['products/get'];
        }
    },
    created() {
        this.$store.dispatch('products/fetchAll');
    },
    methods: {
        formatCurrency(value) {
            return value;
            // return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        },
        openNew() {
            this.product = {
                tags: ['NEW', 'COOL']
            };
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        saveProduct() {
            this.submitted = true;

            if (this.product.name.trim()) {
                if(this.product.id) {
                    this.$store.dispatch('products/update',  this.product);
                } else {
                    this.$store.dispatch('products/create', this.product);
                    // this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                }

                this.productDialog = false;
                this.product = {};
            }
        },
        editProduct(product) {
            this.product = product;
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.$store.dispatch('products/delete', { id: this.product.id });
            this.deleteProductDialog = false;
            this.product = {};
            // this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        createId() {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.deleteProductsDialog = false;
            this.selectedProducts = null;
            // this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    }
}
</script>

<style scoped lang="scss">
.table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.product-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.product-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>