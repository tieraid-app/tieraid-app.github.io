import {
    mount
} from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue with mocked store', () => {
    let wrapper;
    let $store;
    beforeEach(() => {
        $store = {
            state: {
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                refreshTokenInterval: null,
            },
            getters: {
                'tenant/get': jest.fn()
            },
            dispatch: jest.fn()
        }
    
        wrapper = mount(Login, {
            global: {
                mocks: {
                    $store
                },
            },
        })

    })

    it('Render login view with username and password field', () => {
        
        expect(wrapper.html()).toContain('Welcome to tieraid')
        const usernameInput = wrapper.find('input[id=username]');
        const passwordInput = wrapper.find('input[id=password]');
        
        expect(usernameInput).toBeDefined();
        expect(passwordInput).toBeDefined();
    })
    
    it('Login and dispatch to store', async () => {
        expect(wrapper.html()).toContain('Welcome to tieraid')
        const usernameInput = wrapper.find('input[id=username]');
        const passwordInput = wrapper.find('input[id=password]');
        
        usernameInput.element.value = 'abc@abc.se';
        passwordInput.element.value = 'pwd123';
        
        await usernameInput.trigger('input');
        await passwordInput.trigger('input');
        await wrapper.find('form').trigger('submit');

        
        expect($store.dispatch).toHaveBeenCalledWith('auth/login', {'email': 'abc@abc.se', 'password': 'pwd123'})
    })
    
   

})