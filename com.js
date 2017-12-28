Vue.component('todo-list',{
    template:`
        <div class="box">
            <input ref="abc" type="text" placeholder="请输入事项" v-model="con" @keyup.13="add()">
            <ul class="list">
                <div class="btns">
                    <button @click="changeStatus('all')" :class="{checked:status=='all'}">全部</button>
                    <button @click="changeStatus('1')" :class="{checked:status=='1'}">已完成</button>
                    <button @click="changeStatus('0')" :class="{checked:status=='0'}">未完成</button>
                </div>
                <li v-for="item in datas">
                    <div v-if="item.edit" @dblclick="edit(item)">
                        <span class="opt" @click="changestate(item)" :class="{red:item.state=='1'}"></span>
                        <p>{{item.title}}</p>
                        <span class="del" @click="del(item.id)">删除</span>
                    </div>
                    <div v-else>
                        <input type="text" v-model="item.title" @blur="blur(item)">
                    </div>
                </li>
            </ul>
            <div v-show="all.length==0" style="font-size: 14px;">没有符合条件的事项。</div>
        </div>
    `,
    data(){
        return {
            all: localStorage.all?JSON.parse(localStorage.all):[],
            con:'',
            status:'all'
        }
    },
    methods:{
        add(){
            if(!this.con){
                alert('请输入内容');
                return;
            }
            var obj={};
            obj.title=this.con;
            obj.id=Math.random()+new Date().getTime();
            obj.edit=true;
            obj.state=0;
            this.all.push(obj);
            this.con=''
            localStorage.all=JSON.stringify(this.all);
        },
        changeStatus(val){
            this.status=val;
        },
        changestate(obj){
            if(obj.state=='0'){
                obj.state='1'
            }else{
                obj.state='0'
            }
            localStorage.all=JSON.stringify(this.all);
        },
        del(id){
            this.all=this.all.filter((a)=>{
                if(a.id!=id){
                    return a;
                }
            })
            localStorage.all=JSON.stringify(this.all);
        },
        edit(obj){
            obj.edit=false;
            localStorage.all=JSON.stringify(this.all);
        },
        blur(obj){
            obj.edit=true;
            localStorage.all=JSON.stringify(this.all);
        }
    },
    computed:{
        datas(){
            return this.all.filter((a)=>{
                if(this.status=='all'){
                    return a;
                }else{
                    if(a.state==this.status){
                        return a;
                    }
                }
            })
        }
    }
})