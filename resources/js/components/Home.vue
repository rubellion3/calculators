<template>
    <div>
        <div class="container mt-5">
            <div class="row">
                <div class=" col-md-4 col-sm-12 col-xs-12 col-lg-6 col-xl-4">
                    <h6>
                        Calculator A
                    </h6>
                    <div class="card">
                        <div class="card-body">
                            <Calculator @answer="showLog" name="A" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12 col-lg-6 col-xl-4">
                    <h6>
                        Calculator B
                    </h6>
                    <div class="card">
                        <div class="card-body">
                            <Calculator @answer="showLog" name="B" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12 col-lg-12 col-xl-4">
                    <div class="row">
                        <div class="form-inline py-2">
                            <label for="">Results</label>
                            <div class="form-group px-2">
                                <input
                                    v-model="query"
                                    @keyup="search"
                                    class="form-control"
                                    placeholder="Search by result, date"
                                    type="text"
                                />
                            </div>
                            <div class="from-group">
                                <select
                                    class="form-control"
                                    v-model="selectCal"
                                    @click="search"
                                    name=""
                                    id=""
                                >
                                    <option value="" selected> all</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <!-- {{logs}} -->
                            <div v-for="log in logs" :key="log.id">
                                <div class="container">
                                    <div class="row justify-content-between">
                                        <div>Caculator {{ log.name }}</div>
                                        <div>{{ log.times }}</div>
                                    </div>
                                    <div class="row">{{ log.answer }}</div>
                                    <hr />
                                    <div class="row">{{ log.expr }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn clear" @click="clearStorage">
            Clear
        </button>
    </div>
</template>

<script>
import Calculator from "./Calculator";
export default {
    components: {
        Calculator
    },
    data() {
        return {
            logs: [],
            selectCal: "",
            query: ""
        };
    },
    mounted() {
        if (localStorage.getItem("logs")) {
            try {
                this.logs = JSON.parse(localStorage.getItem("logs"));
            } catch (e) {
                localStorage.removeItem("logs");
            }
        }
    },
    methods: {
        search() {
            if (
                this.query == "" &&
                this.selectCal == "" &&
                localStorage.getItem("logs")
            ) {
                this.logs = JSON.parse(localStorage.getItem("logs"));
            } else {
                var self = this;
                let res = [];
                JSON.parse(localStorage.getItem("logs")).find(function(x) {
                    if (
                        x.name.indexOf(self.selectCal) == 0 &&
                        (x.answer.toString().indexOf(self.query) > -1 ||
                            x.times.toString().indexOf(self.query) > -1)
                    ) {
                        res.push(x);
                    }
                });
                this.logs = res;
            }
        },
        async showLog(value) {
            this.logs.push(value);
            this.save();
        },

      async  clearStorage() {
          await  Swal.fire({
                title: "Warnning!",
                text: "Do you want to Clear",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "Comfirm"
            })
                .then(result => {
                    if (result.isConfirmed) {
                        this.toast();
                        localStorage.clear();
                        this.logs = [];
                    }
                })
                .catch(err => {});
        },
        save() {
            let parsed = JSON.stringify(this.logs);
            localStorage.setItem("logs", parsed);
        },
        toast() {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: toast => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                }
            });
            Toast.fire({
                icon: "success",
                title: "Successfully"
            });
        }
    }
};
</script>

<style></style>
