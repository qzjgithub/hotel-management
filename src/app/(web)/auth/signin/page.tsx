'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, message } from 'antd';

const SignInPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [currentMode, setCurrentMode] = useState('email');

  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const isMobile = useMemo(() => currentMode === 'phone', [currentMode]);

  useEffect(() => {
    if (session?.user?.name) router.push('/');
  }, [router, session]);

  const switchMode = useCallback(() => {
    setCurrentMode((prev) => (prev === 'email' ? 'phone' : 'email'));
    form.resetFields(['email', 'phone']);
  }, [form]);

  const registerHandler = async () => {
    router.push('/auth');
  };

  const confirmForm = useCallback(async() => {
    try {
      setLoading(true);
      const res = await form.validateFields();
      console.log(res);
      const subData = {
        password: res.password,
        ...(isMobile ? { phone: res.phone } : { email: res.email })
      };
      const result = await signIn('credentials', {
        ...subData,
        redirect: false
      });
      if (!result?.ok) {
        messageApi.error(result?.error || '登录失败');
      }
    } catch {
      // do nothing
    } finally {
      setLoading(false);
    }
  }, [form, isMobile, messageApi]);

  return (
    <section
      className='h-full w-full flex items-center justify-center'
    >
      {contextHolder}
      <div className='container'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto'>
          <div className='flex mb-8 flex-col md:flex-row items-center justify-center'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
              登录
            </h1>
          </div>
          <Form
            layout='vertical'
            form={form}
          >
            {
              isMobile ? (
                <Form.Item
                  label='手机号'
                  name='phone'
                  rules={[
                    {required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}
                  ]}
                >
                  <Input
                    placeholder='请输入手机号'
                    size='large'
                    autoComplete='off'
                    addonBefore='+86'
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  label='邮箱'
                  name='email'
                  rules={[
                    {required: true, pattern: /^\w+([-+.]\w+)*@(vip.qq|qq|gmail|163|126|sina|sohu|hotmail)\.com$/, message: '请输入正确的邮箱格式'}
                  ]}
                >
                  <Input
                    type='email'
                    placeholder='请输入邮箱'
                    size='large'
                    autoComplete='off'
                  />
                </Form.Item>
              )
            }
            <Form.Item
              label='密码'
              name='password'
              rules={[{ required: true, message: '请输入密码', whitespace: true }]}
            >
              <Input.Password
                type='email'
                placeholder='请输入密码'
                size='large'
                autoComplete='off'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                block
                size='large'
                className='bg-tertiary-dark'
                onClick={confirmForm}
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item
              className='text-right'
            >
              <Button
                type='link'
                onClick={registerHandler}
              >
                没有账号，前往注册
              </Button>
            </Form.Item>
            {/* <Form.Item
              className='text-center'
            >
              <Button
                type='text'
                onClick={switchMode}
              >
                使用{isMobile ? '邮箱' : '手机号'}登录
              </Button>
            </Form.Item> */}
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
