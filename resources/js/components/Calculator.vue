<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="calculator">
                <div class="answer">
                    {{ answer || current || temp }}
                </div>
                <div
                    v-html="$options.filters.colorSign(logList + current)"
                    class="display"
                >
                    {{ logList + current }}
                </div>
                <div @click="clear" id="clear" class="btn  operator shadow">
                    C
                </div>
                <div @click="times" id="times" class="btn operator shadow">
                    *
                </div>
                <div @click="minus" id="minus" class="btn operator shadow">
                    -
                </div>
                <div @click="plus" id="plus" class="btn operator shadow">+</div>
                <div @click="append(7)" class="btn shadow">7</div>
                <div @click="append(8)" class="btn shadow">8</div>
                <div @click="append(9)" class="btn shadow">9</div>
                <div @click="equal" id="equal" class="btn operator shadow">
                    =
                </div>
                <div @click="append(4)" class="btn shadow">4</div>
                <div @click="append(5)" class="btn shadow">5</div>
                <div @click="append(6)" class="btn shadow">6</div>
                <div @click="append(1)" class="btn shadow">1</div>
                <div @click="append(2)" class="btn shadow">2</div>
                <div @click="append(3)" class="btn shadow">3</div>
                <div @click="append(0)" class="btn shadow" id="zero">0</div>
                <div @click="dot" class="btn shadow">.</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: ""
    },
    data() {
        return {
            logList: "",
            current: "",
            answer: "",
            operatorClicked: true,
            expr: "",
            temp: "",
            LogHistory: {},
            showLogs: []
        };
    },
    methods: {
        append(n) {
            if (this.operatorClicked) {
                this.current = "";
                this.operatorClicked = false;
            }
            // this.current = `${this.current}${n}`
            this.current = this.current + n;
        },
        async addtoLog(operator) {
            let expr = this.logList + this.current;
            if (this.operatorClicked == false) {
                this.logList += `${this.current} ${operator} `;
                this.current = "";
                this.operatorClicked = true;

                await axios
                    .get(
                        "http://api.mathjs.org/v4/?expr=" +
                            encodeURIComponent(expr)
                    )
                    .then(res => {
                        this.temp = parseFloat(res.data.toFixed(2));
                    })
                    .catch(err => {});
            }
        },
        clear() {
            this.current = "";
            this.answer = "";
            // this.expr = '';
            this.temp = "";
            this.operatorClicked = false;
            this.logList = "";
        },
        times() {
            if (this.current !== "") {
                this.addtoLog("*");
            }
        },
        plus() {
            if (this.current !== "") {
                this.addtoLog("+");
            }
        },
        minus() {
            if (this.current !== "") {
                this.addtoLog("-");
            }
        },
        async equal() {
            this.expr = this.logList + this.current;
            await axios
                .get(
                    "http://api.mathjs.org/v4/?expr=" +
                        encodeURIComponent(this.expr)
                )
                .then(res => {
                    this.answer = parseFloat(res.data.toFixed(2));
                })
                .catch(err => {
                    Swal.fire({
                        title: "Error!",
                        text: "Something wrong, please check your expression",
                        icon: "error",
                        confirmButtonText: "Confirm"
                    });
                });
            this.LogHistory.name = this.name;
            this.LogHistory.expr = this.expr;
            this.LogHistory.answer = this.answer;
            this.LogHistory.times = new Date().toLocaleString();
            // this.showLogs.push(this.LogHistory);
            this.$emit("answer", this.LogHistory);

            this.LogHistory = {};
            // this.operatorClicked = true;
        },
        dot() {
            if (this.current.indexOf(".") === -1) {
                this.append(".");
                // this.current = this.current + ".";
            }
        }
    },
    watch: {},
    filters: {
        colorSign: function(value) {
            const reg = /(\+|-|\*|)/g;
            return value.toString().replace(reg, function(matchedText, a, b) {
                return '<span class="highlightText">' + matchedText + "</span>";
            });
        }
    }
};
</script>

<style>
.highlightText {
    color: orange;
}
</style>
